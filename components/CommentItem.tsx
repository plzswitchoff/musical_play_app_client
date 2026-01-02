import { Comment } from "@/types";
import { colors } from "@/constants";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "@/components/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import InputField from "@/components/InputField";
import useAuth from "@/hooks/queries/useAuth";
import { useActionSheet } from "@expo/react-native-action-sheet";
import useDeleteComment from "@/hooks/queries/useDeleteComment";

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReply?: () => void;
  parentCommentId?: number | null;
  onCancelReply?: () => void;
}

function CommentItem({
  comment,
  isReply = false,
  onReply,
  onCancelReply,
  parentCommentId,
}: CommentItemProps) {
  const { auth } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();
  const deleteComment = useDeleteComment();
  const handlePressOption = () => {
    const options = ["삭제", "취소"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            deleteComment.mutate(comment.id);
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {isReply && (
          <MaterialCommunityIcons
            name="arrow-right-bottom"
            size={24}
            color={"black"}
          />
        )}
        <Profile
          imageUri={comment.isDeleted ? "" : comment.user.imageUri}
          nickname={comment.isDeleted ? "(삭제)" : comment.user.nickname}
          createdAt={comment.createdAt}
          onPress={() => {}}
          option={
            // 본인 댓글인 경우에만 옵션 아이콘 표시
            auth.id === comment.user.id &&
            // 삭제된 댓글이 아닌 경우에만 옵션 아이콘 표시
            !comment.isDeleted && (
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color="black"
                onPress={handlePressOption}
              />
            )
          }
        />
      </View>
      <InputField
        editable={false}
        value={comment.isDeleted ? "삭제된 댓글입니다." : comment.content}
      />
      {!comment.isDeleted && !isReply && (
        <View style={styles.replyButtonContainer}>
          <Pressable onPress={onReply}>
            <Text style={styles.replyButton}>답글 남기기</Text>
          </Pressable>
          {parentCommentId === comment.id && (
            <Pressable onPress={onCancelReply}>
              <Text style={styles.cancelButton}>취소</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    padding: 16,
    gap: 12,
    borderColor: colors.GRAY_200,
    borderWidth: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  replyButtonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  replyButton: {
    fontWeight: "bold",
    color: colors.ORANGE_600,
    fontSize: 12,
  },
  cancelButton: {
    fontWeight: "bold",
    color: colors.BLACK,
    fontSize: 12,
  },
});

export default CommentItem;
