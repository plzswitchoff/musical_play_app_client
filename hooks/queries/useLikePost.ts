import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * 좋아요 기능을 위한 커스텀 훅 (낙관적 업데이트 적용)
 *
 * 🎯 낙관적 업데이트(Optimistic Update)란?
 * - 서버 응답을 기다리지 않고 UI를 먼저 업데이트하는 패턴
 * - "서버 요청이 성공할 것"이라고 낙관적으로 가정하고 즉시 화면을 변경
 * - 사용자에게 즉각적인 피드백을 제공하여 UX 향상
 * - 만약 서버 요청이 실패하면, 저장해둔 이전 상태로 롤백(되돌리기)
 *
 * 📝 동작 흐름:
 * 1. onMutate: 서버 요청 전에 UI를 먼저 업데이트 (이전 상태 백업)
 * 2. mutationFn: 실제 서버에 좋아요 요청
 * 3. onError: 서버 요청 실패 시 → 백업해둔 이전 상태로 롤백
 * 4. onSettled: 성공/실패 관계없이 → 서버 데이터로 다시 동기화
 */
function useLikePost() {
  return useMutation({
    // 실제 서버에 좋아요 요청을 보내는 함수
    mutationFn: likePost,

    /**
     * 🚀 onMutate: 뮤테이션(서버 요청)이 시작되기 "직전"에 호출됨
     * - 여기서 낙관적 업데이트를 수행
     * - return한 값은 context로 onError, onSettled에서 사용 가능
     */
    onMutate: async (postId) => {
      // ⏸️ 1단계: 진행 중인 쿼리 취소
      // - 왜? 서버에서 오래된 데이터를 가져오는 요청이 있다면,
      //   그 응답이 우리의 낙관적 업데이트를 덮어쓸 수 있음
      // - 이를 방지하기 위해 현재 진행 중인 해당 포스트 쿼리를 취소
      await queryClient.cancelQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, postId],
      });

      // 👤 2단계: 현재 로그인한 사용자 정보 가져오기
      // - 캐시에서 사용자 정보를 읽어옴 (서버 요청 X)
      const user = queryClient.getQueryData<Profile>([
        queryKeys.AUTH,
        queryKeys.GET_ME,
      ]);
      const userId = Number(user?.id);

      // 💾 3단계: 이전 상태 백업 (롤백용)
      // - 서버 요청이 실패할 경우를 대비해 현재 상태를 저장
      const previousPost = queryClient.getQueryData<Post>([
        queryKeys.POST,
        queryKeys.GET_POST,
        postId,
      ]);

      // ✏️ 4단계: 새로운 상태 생성 (낙관적으로 업데이트할 데이터)
      const newPost = { ...previousPost };

      // 🔍 5단계: 이미 좋아요를 눌렀는지 확인
      // - likes 배열에서 현재 사용자의 좋아요를 찾음
      // - 있으면 해당 인덱스 반환, 없으면 -1 반환
      const likedIndex =
        previousPost?.likes.findIndex((like) => like.userId === userId) ?? -1;

      // ❤️ 6단계: 좋아요 토글 (추가 또는 제거)
      // - likedIndex >= 0: 이미 좋아요 함 → 좋아요 취소 (배열에서 제거)
      // - likedIndex < 0: 아직 좋아요 안 함 → 좋아요 추가 (배열에 추가)
      likedIndex >= 0
        ? newPost.likes?.splice(likedIndex, 1) // 좋아요 취소: 해당 인덱스의 요소 제거
        : newPost.likes?.push({ userId }); // 좋아요 추가: 새 좋아요 객체 추가

      // 🎨 7단계: 캐시 업데이트 → UI 즉시 반영!
      // - 서버 응답을 기다리지 않고 캐시를 직접 수정
      // - React Query가 이 변경을 감지하고 UI를 자동으로 리렌더링
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, postId],
        newPost,
      );

      // 📦 8단계: context 반환 (onError에서 롤백할 때 사용)
      return { previousPost, newPost };
    },

    /**
     * ❌ onError: 서버 요청이 실패했을 때 호출됨
     * - context에는 onMutate에서 return한 값이 들어있음
     * - 백업해둔 previousPost로 롤백하여 원래 상태로 복구
     */
    onError: (err, newPost, context) => {
      // ⏪ 롤백: 낙관적으로 업데이트했던 것을 이전 상태로 되돌림
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, context?.previousPost?.id],
        context?.previousPost,
      );
    },

    /**
     * ✅ onSettled: 성공/실패 여부와 관계없이 "항상" 마지막에 호출됨
     * - 서버의 실제 데이터로 캐시를 다시 동기화
     * - 혹시 모를 데이터 불일치를 방지
     */
    onSettled: (data, error, variables, context) => {
      // 🔄 해당 포스트 데이터를 서버에서 다시 가져옴 (캐시 무효화)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, variables],
      });
      // 🔄 포스트 목록도 다시 가져옴 (좋아요 수 업데이트 반영)
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
    },
  });
}

export default useLikePost;
