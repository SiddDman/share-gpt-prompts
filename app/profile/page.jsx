"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (session?.user.id) fetchPrompts();
  }, []);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${prompt._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Redirect to homepage if user is not signed in
  if (status === "loading") return null; // Render nothing while loading
  if (!session) {
    router.push("/");
    return null; // Render nothing if redirecting
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page!!"
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
