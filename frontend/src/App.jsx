import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { createCommunity} from "./pages/HomePage";
import { getTopics } from "./util/api";
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
import DisplayCommunity from "./components/display Community/DisplayCommunity";
import { getCommunities, getPostById } from "./util/api";
import ErrorPage from "./pages/ErrorPage";
import { createPost } from "./util/api";
import CommunityLayout from "./root layouts/CommunityLayout";
import { getCommunityByName } from "./util/api";
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
          loader: getCommunityByName,

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
