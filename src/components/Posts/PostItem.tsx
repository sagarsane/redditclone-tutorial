import { Post } from "@/atoms/postsAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={"gray.300"}
      borderRadius={4}
      cursor={"pointer"}
      _hover={{ borderColor: "gray.500" }}
      onClick={onSelectPost}
      >
        <Flex
        direction="column"
        align="center"
        bg={"gray.100"}
        p={2}
        width="40px"
        borderRadius={"3px 0px 0px 3px"}
      ></Flex>
      {post.title}
    </Flex>
  );
};
export default PostItem;
