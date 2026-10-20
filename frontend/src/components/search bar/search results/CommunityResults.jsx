import { useEffect, useState } from "react";
import { getCommunitySearchResults } from "../../../util/api";
import { useNavigate, useParams } from "react-router";

const communities = [
  {
    name: "javascript",
    description:
      "All about JavaScript, the web's most popular programming language.",
    members: 2450000,
    logo: "https://placehold.co/80x80/f7df1e/000000?text=JS",
  },
  {
    name: "reactjs",
    description:
      "A community for React developers to share knowledge, projects, and questions.",
    members: 850000,
    logo: "https://placehold.co/80x80/20232a/61dafb?text=R",
  },
  {
    name: "webdev",
    description: "A community dedicated to all things web development.",
    members: 2100000,
    logo: null,
  },
  {
    name: "leetcode",
    description:
      "Discuss coding problems, interview preparation, and data structures.",
    members: 650000,
    logo: null,
  },
  {
    name: "programming",
    description:
      "Computer programming, software engineering, and everything in between.",
    members: 5200000,
    logo: null,
  },
];

const colors = [
  "bg-purple-600",
  "bg-emerald-600",
  "bg-orange-500",
  "bg-blue-600",
  "bg-pink-600",
];

export default function CommunityResults() {
  const [data, setData] = useState([]);
  const { searchResult: name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const response = await getCommunitySearchResults(name);
      setData(response);
    }
    getData();
  }, [name]);


  if (!data?.length) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-gray-400">
        No community found for "{name}"
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col ">
        {data.map((community, index) => (
          <div
            key={community.name}
            className="flex items-start gap-3 py-4 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate(`/r/${community.name}`)}
          >
            {/* Logo */}
            {community.logo ? (
              <img
                src={community.logo}
                alt={`${community.name} logo`}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
              >
                r/
              </div>
            )}

            {/* Community Information */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                r/{community.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {community.description}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
                240K members
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
