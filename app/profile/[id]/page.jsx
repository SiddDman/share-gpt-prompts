"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`);
      const data = await res.json();

      setUserPrompts(data);
    };
    console.log(params?.id);
    if (params?.id) fetchPrompts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s profile. Explpore ${userName}'s prompts and integrate them in your workflow to make better use of AI.`}
      data={userPrompts}
    />
  );
};

export default UserProfile;
