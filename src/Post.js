import React, { useEffect, useState } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db, firebaseApp } from "./Firebase";
import firebase from "firebase";

function Post({ imageUrl, username, caption, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log("test comment", comment);
    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Key=AAAAyPrLtfo:APA91bEJAZnlHsqEbAHn2nUna-DJCYG_ZN1HuYJKTLxUA-EcnWmg6LG63wQdX6DDcA8uFIGvVTPZ3xpK67T28KuZYeaX3qiDfNyAfqsC0wo4mk0Pggy9sclwuKMjbixqLFvZSlc3y5v3",
      },
      body: JSON.stringify({
        notification: {
          title: user.displayName,
          body: JSON.stringify(comment),
          click_action: "instagram",
        },
        to:
          "ewBH-xARAfnWobmb3G-ns2:APA91bHXzSl1_0--fb8F0ZkLDaQFQY5kO98y2TV6W1fH54mHCNGUE5E6RliSutZIsJD3OnA9nMM0hJQAI7IoA-pgtK_kWKfAbobodzWsSSLCAFiZR5EQf5b3EPF7S3m2KIZvzrGCPevB",
      }),
    });
    setComment("");
  };

  // Notification setup

  useEffect(() => {
    const msg = firebaseApp.messaging();
    msg
      .requestPermission()
      .then(() => {
        return msg.getToken();
      })
      .then((data) => {
        console.warn("token", data);
      });
  });

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar "
          alt="Radeqazi"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="avatar" />
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__btn"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
