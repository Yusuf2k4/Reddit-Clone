import React from 'react'
import { Outlet, useLoaderData, useNavigation } from 'react-router'
import Spinner from '../util/loading screen/Spinner';

function CommunityLayout() {
   const navigation = useNavigation();
  return (
    <>
      {navigation.state === "loading" && <Spinner />}
       <Outlet /> 
    </>
  )
}

export default CommunityLayout