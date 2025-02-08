import React, { useEffect } from 'react'
import { getUrl } from 'aws-amplify/storage';

export const useFetchS3 = (path = '') => {
  const [url, setUrl] = React.useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = (await getUrl({ path: path }))?.url?.href;
        setUrl(url);
      } catch (error) {
        console.error("Error fetching logo:", error);
      }
    };
    fetchData();
  }, []);

  return url;
}
