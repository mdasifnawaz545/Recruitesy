"use client"
import { signIn, SignInResponse } from "next-auth/react";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";


export default function Home() {
  const [googleState, setGoogleState] = useState<boolean>(false)
  const [githubState, setGithubState] = useState<boolean>(false)
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setGoogleState(true);
    try {
      const response: SignInResponse | undefined = await signIn("google", {
        redirect: false,
        callbackUrl: "/home"
      });
      if (response) {
        // In the above if statement by using ? symbol we are saying to the if block that response object is an optional if it come then true otherwise give false value and then the if statement will be false and it will execute the else statement.
        toast({
          title: "Success",
          description: "Logged In Successfully"
        });
        setGoogleState(false);
        redirect("/home");

      }

    } catch (error) {
      toast({
        title: "Failed",
        description: "Authenticaiton Failed"
      })
    }

  }

  const handleGithubLogin = () => {
    setGithubState(true);
    console.log("login with github")
    setGithubState(false);

  }

  /*
  
  Framer Motion Variants for the child elements.

  const googleButtonVariant = {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,

    }
  }

  const gitHubButtonVariant = {
    initial: {
      x: "-100vw",
    },
    animate: {
      x: 0,

    }
  }

  */

  const signUpVariant = {
    initial: {
      x: "100vw",
    },
    animate: {
      x: 0,

    }
  }

  return (
    <motion.div variants={signUpVariant} initial="initial" animate="animate" className="w-full min-h-screen flex items-center justify-center text-sm">
      <div className=" w-64 h-[350px] bg-transparent border-mywidth border-gray-600 backdrop-blur-lg rounded-xl drop-shadow-lg flex flex-col justify-evenly items-center gap-4">
        <div>
          <img src="https://res.cloudinary.com/dpqdgcipi/image/upload/v1737533670/image-removebg-preview_1_gl5lis.png" width={200} height={50} alt={"LOGO"} />
        </div>
        <div className="flex-col items-center justify-center ">
          <motion.button className="bg-transparent border-mywidth border-x-gray-600  h-9 w-52 py-2 px-4 drop-shadow-lg mb-4 flex items-center justify-center text-white rounded-lg hover:border-x-white duration-200 hover:drop-shadow-xl" onClick={handleGoogleLogin}> <FcGoogle /> {(googleState) ? (<>
            <p className="ml-4 text-center flex items-center justify-center">Signing In </p>
            <Loader2 className=" animate-spin duration-300 ml-2" />
          </>) : <p className="ml-4 text-center flex items-center justify-center">Sign in with Google</p>}</motion.button>
          <motion.button className="bg-transparent border-mywidth border-x-gray-600  h-9 w-52 py-2 px-4 drop-shadow-lg flex items-center justify-center text-white rounded-lg hover:border-x-white duration-200 hover:drop-shadow-xl" onClick={() => { handleGithubLogin() }}> <FaGithub />{(githubState) ? (<>
            <p className="ml-4 text-center flex items-center justify-center">Signing In </p>
            <Loader2 className=" animate-spin duration-300 ml-2" />
          </>) : <p className="ml-4 text-center flex items-center justify-center">Sign in with Github</p>}</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
