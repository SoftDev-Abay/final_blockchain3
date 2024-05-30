import React, { useState, useEffect } from "react";
import ViewPost from "./PostPage";
import { useBlog } from "src/context/Blog";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();

  console.log("id", id);

  const { getBlogByPublicKey } = useBlog();

  const post = getBlogByPublicKey(id);

  const transformedPost = {
    ...post.account,
    publicKey: post.publicKey.toBase58(),
    img: "https://www.google.com/imgres?q=img&imgurl=https%3A%2F%2Fdynamic-media-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F0f%2Fba%2F29%2F5c%2Fimg-worlds-of-adventure.jpg%3Fw%3D1200%26h%3D1200%26s%3D1&imgrefurl=https%3A%2F%2Fwww.tripadvisor.com%2FAttraction_Review-g295424-d10687494-Reviews-IMG_Worlds_of_Adventure-Dubai_Emirate_of_Dubai.html&docid=4CepYyh_L6BPmM&tbnid=BHbOsHsYSl36gM&vet=12ahUKEwig8s3F87OGAxVyR1UIHaB9DhkQM3oECHEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwig8s3F87OGAxVyR1UIHaB9DhkQM3oECHEQAA",
  };

  console.log(transformedPost);

  return (
    <div>
      <ViewPost {...transformedPost} />
    </div>
  );
};

export default PostPage;
