import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "@/constants";
import { useLocalSearchParams } from "expo-router";
import { useGetPost } from "@/hooks/queries/useGetPost";
import AuthRoute from "@/components/AuthRoute";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeedItem from "@/components/FeedItem";
import InputField from "@/components/InputField";
import { Fragment, useRef, useState } from "react";
import useCreateComment from "@/hooks/queries/useCreateComment";
import CommentItem from "@/components/CommentItem";
import NativeSafeAreaView from "react-native-safe-area-context/src/specs/NativeSafeAreaView";

export default function postDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: post, isPending, isError } = useGetPost(Number(id));
  const [content, setContent] = useState("");
  const createComment = useCreateComment();
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);
  const inputRef = useRef<TextInput | null>(null);

  if (isPending || isError) {
    return <></>;
  }

  const handleReply = (commentId: number) => {
    setParentCommentId(commentId);
    inputRef.current?.focus();
  };

  const handleCancelReply = () => {
    setParentCommentId(null);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.WHITE,
    },
    awareScrollViewContainer: {
      flex: 1,
      backgroundColor: colors.GRAY_200,
    },
    scrollViewContainer: {
      backgroundColor: colors.GRAY_200,
    },
    commentCount: {
      marginTop: 12,
      backgroundColor: colors.WHITE,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      fontWeight: "bold",
    },
    commentInputContainer: {
      width: "100%",
      borderTopColor: colors.GRAY_200,
      borderTopWidth: StyleSheet.hairlineWidth,
      backgroundColor: colors.WHITE,
      padding: 16,
      bottom: 0,
      position: "absolute",
    },
    inputButtonContainer: {
      backgroundColor: colors.ORANGE_600,
      padding: 8,
      borderRadius: 5,
    },
    inputButtonText: {
      color: colors.WHITE,
      fontWeight: "bold",
    },
  });

  const handleSubmitComment = () => {
    const commentData = {
      content,
      postId: post.id,
    };

    if (parentCommentId) {
      // 답글
      createComment.mutate({
        ...commentData,
        parentCommentId: parentCommentId,
      });
      setParentCommentId(null);
      setContent("");
      return;
    }
    createComment.mutate({ ...commentData });
    setContent("");
    setTimeout(() => {
      scrollRef.current?.scrollToEnd();
    }, 500);
  };

  return (
    <AuthRoute>
      <NativeSafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.awareScrollViewContainer}
        >
          <ScrollView
            style={{ marginBottom: 75 }}
            ref={scrollRef}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <View style={{ marginTop: 12 }}>
              <FeedItem post={post} isDetail />
              <Text style={styles.commentCount}>
                댓글 {post.commentCount}개
              </Text>
            </View>

            {post.comments.map((comment) => (
              <Fragment key={comment.id}>
                <CommentItem
                  comment={comment}
                  onReply={() => handleReply(comment.id)}
                  onCancelReply={handleCancelReply}
                  parentCommentId={parentCommentId}
                />
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </Fragment>
            ))}
          </ScrollView>

          <View style={styles.commentInputContainer}>
            <InputField
              ref={inputRef}
              placeholder={
                parentCommentId ? "댓글 남기는 중" : "댓글을 입력하세요"
              }
              value={content}
              onChangeText={setContent}
              returnKeyType="send"
              rightChild={
                <Pressable
                  disabled={!content}
                  onPress={handleSubmitComment}
                  style={styles.inputButtonContainer}
                >
                  <Text style={styles.inputButtonText}>등록</Text>
                </Pressable>
              }
            />
          </View>
        </KeyboardAwareScrollView>
      </NativeSafeAreaView>
    </AuthRoute>
  );
}
