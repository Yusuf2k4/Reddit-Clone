import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { createCommunity, getTopics } from "./pages/HomePage";
import RootLayout from "./root layouts/RootLayout";
import Chat from "./pages/Chat";

import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Popular from "./pages/Popular";
import Explore from "./pages/Explore";
import All from "./pages/Communities";
import { Plus } from "lucide-react";
import Communities from "./pages/Communities";
import DisplayCommunity, {
  getCommunity,
} from "./components/display Community/DisplayCommunity";
import { getCommunities, getPostById } from "./util/loader/Loader";
import ErrorPage from "./pages/ErrorPage";
import { createPost } from "./util/action/Action";
import CommunityLayout from "./root layouts/CommunityLayout";

import DisplayPost from "./components/display post/DisplayPost";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      loader: getTopics,
      action: createCommunity,

      children: [
        {
          index: true,
          element: <HomePage></HomePage>,
        },
        {
          path: "/chats",
          element: <Chat />,
        },
        
        {
          path: "/post",
          element: <CreatePost />,
          loader: getCommunities,
        },

        {
          path: "/notifications",
          element: <Notifications />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/popular",
          element: <Popular />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/communities",
          element: <Communities />,
        },
       
        {
          path:"r/:communityName",
          id: "community",
          element:<CommunityLayout />,
          loader: getCommunity,

          children: [
            {
              index: true,
              element: <DisplayCommunity />

            },
            {
              path: "post",
              element: <CreatePost />,
              loader: getCommunities,
              action: createPost
            },
            {
              path: ":id/comments",
              element: <DisplayPost />,
              loader: getPostById
            }

          ]

        }
      ],
    },
  ]);
  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
