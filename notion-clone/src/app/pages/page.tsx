"use client";
import { useSearchParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';

const DynamicPage = () => {
  const [pageData, setPageData] = useState(null);
  const searchParams = useSearchParams()
  const pageId = searchParams?.get('id') ?? '';
  const router = useRouter()

  const loadPageData = async () => {
    try {
      const response = await fetch(`/api/manage-pages-data?pageId=${pageId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data) {
        if(data?.error) router.push('/error');
        setPageData(data.textAreas);
      } 

    } catch (error) {
      console.error('load request error:', error);
    }
  };

  useEffect(() => {
    loadPageData()
  }, [pageId])


  return (
    <div className="notion-app">
      <Sidebar />
      <MainContent pageDataToLoad={pageData} pageId={pageId} />
    </div>
  );
};

export default DynamicPage;