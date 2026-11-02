import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { getUserHistory } from "../../util/api"
import PostList from "./PostList"
import Spinner from "../../util/loading screen/Spinner"

export default function UserHistory() {
    const {user} = useContext(UserContext)
    const {data, isLoading, isError} = useQuery({
        queryKey: ['user-history', user?.id],
        queryFn: getUserHistory
    })


    

  return (
    <PostList posts={data} showVoting showUserName={false}/>
  )
}
