import React, { useEffect, useContext, useState } from "react";

import { AppContext } from "../../context/applicationContext";
import LoadingIndicator from "../../components/LoadingIndicator";

import { getOthersFeedsApi } from "../../util/ApiUtil";

import MyProfile from "../../components/MyProfile";
import AddFeed from "../../components/AddFeed";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedCard from "../../components/FeedCard";

const Dashboard = () => {
  const appContext = useContext(AppContext);
  const token = appContext.getSession();
  const userData = appContext.getUserData();

  const [feedsData, setFeedsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.title = "Home | Feed App";
    getOthersFeeds(0);
  }, []);

  if (!userData) {
    return <LoadingIndicator />;
  }

  const getOthersFeeds = async (loadPageNumber) => {
    if (loadPageNumber === 0) {
      setFeedsData([]);
    }

    const apiResponse = await getOthersFeedsApi(token, loadPageNumber);

    console.log(apiResponse);

    if (apiResponse.status === 1) {
      let feedsDataNew = [];
      if (loadPageNumber !== 0) {
        feedsDataNew = feedsData;
      }
      feedsDataNew.push(...apiResponse.payLoad.content);
      setFeedsData(feedsDataNew);

      setPageNumber(loadPageNumber + 1);

      if (loadPageNumber + 1 === apiResponse.payLoad.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12 mx-0 md:mx-12 w-2xl container px-2">
      <MyProfile />
      <article>
        <AddFeed />
        <InfiniteScroll
          dataLength={feedsData.length}
          next={() => getOthersFeeds(pageNumber)}
          hasMore={hasMore}
          endMessage={
            <p className="text-center">
              <b>Yay! You have seen it all.</b>
            </p>
          }
          refreshFunction={() => getOthersFeeds(0)}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 className="text-center">&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 className="text-center">&#8593; Release to refresh</h3>
          }
        >
          <div className="mt-3">
            {feedsData.map(
              ({ feedId, picture, content, createdOn, feedMetaData, user }) => (
                <FeedCard
                  key={feedId}
                  feedId={feedId}
                  picture={picture}
                  content={content}
                  createdOn={createdOn}
                  username={user.username}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  profilePicture={user.profile ? user.profile.picture : null}
                  feedMetaData={feedMetaData}
                />
              )
            )}
          </div>
        </InfiniteScroll>
      </article>
    </main>
  );
};

export default Dashboard;
