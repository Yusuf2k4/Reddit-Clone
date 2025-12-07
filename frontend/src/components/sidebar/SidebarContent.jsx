// components/sidebar/SidebarContent.jsx
import React, { useContext, useRef } from "react";
import MainFeed from "./MainFeed";
import CustomFeed from "./CustomFeed";
import Line from "../style/Line";
import CreateCommunity from "../create Community/CreateCommunity";
import { Plus, Settings, Compass } from "lucide-react";
import { UserContext } from "../../context/UserContext";

/**
 * SidebarContent
 * - Pure internal UI (no fixed width/positioning)
 * - Accepts sidebarOpen prop and uses its own modalRef
 */
const SidebarContent = ({ sidebarOpen }) => {
  const modalRef = useRef();
  const { user } = useContext(UserContext);

  function openModal() {
    if (modalRef?.current?.open) modalRef.current.open();
  }

  return (
    <div className="space-y-0 overflow-y-auto pr-1">
      {sidebarOpen && (
        <>
          <MainFeed isOpen={sidebarOpen} />

          <Line />

          <CustomFeed
            sidebarOpen={sidebarOpen}
            title="CUSTOM FEEDS"
            items={[{ icon: <Plus />, label: "Create custom feed" }]}
          />

          <Line />

          <CustomFeed
            sidebarOpen={sidebarOpen}
            title="RECENT"
            items={[
              { icon: <img src="vite.svg" />, label: "r/soccer" },
              { icon: <img src="vite.svg" />, label: "r/Science" },
            ]}
          />

          <Line />
          {user && (
            <CustomFeed
              sidebarOpen={sidebarOpen}
              title="COMMUNITIES"
              items={[
                {
                  icon: <Plus />,
                  label: "Create community",
                  action: openModal,
                },
                { icon: <Settings />, label: "Manage Communities" },
                { icon: <img src="vite.svg" />, label: "r/soccer" },
                { icon: <img src="vite.svg" />, label: "r/Science" },
                { icon: <Compass />, label: "r/compass" },
              ]}
            />
          )}
        </>
      )}

      {/* CreateCommunity modal lives here so both Desktop and Mobile can open it */}
      <CreateCommunity ref={modalRef} />
    </div>
  );
};

export default SidebarContent;
