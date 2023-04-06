import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";

type PostsProps = {
  communityData: Community;
  userId?: string;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts();

  const getPosts = async () => {
    console.log("WE ARE GETTING POSTS!!!");

    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData?.id!),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Posts: ", posts);

      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
        // postsCache: {
        //   ...prev.postsCache,
        //   [communityData?.id!]: posts as Post[],
        // },
        //postUpdateRequired: false,
      }));
    } catch (error: any) {
      console.log("getPosts error", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);
    return (
        <Stack>
            {
                postStateValue.posts.map(item => (
                    <PostItem
                        post={item}
                        userIsCreator={user?.uid === item.creatorId}
                        userVoteValue={undefined}
                        onVote={onVote}
                        onSelectPost={onSelectPost}
                        onDeletePost={onDeletePost} />)
                )
            }
        </Stack>
  );
};
export default Posts;
