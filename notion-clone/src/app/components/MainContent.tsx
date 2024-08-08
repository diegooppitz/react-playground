import React, { useEffect, useState } from 'react';
import MarkdownEditor from "./MarkdownEditor";

interface TextAreaProps {
  id: string;
  markdownText: string | null;
}


const MainContent: React.FC<{ pageDataToLoad: TextAreaProps[] | null, pageId: string, isHome: boolean}> = ({ pageDataToLoad, pageId, isHome = false }) => {
  const [textAreas, setTextAreas] = useState<{ id: string, markdownText: string | null }[]>([{ id: '', markdownText: 'Type something here...' }]);
  const homeData = [{ id: 'item-home-0', markdownText: '# Getting Started' }, { id: 'item-home-1', markdownText: 'Welcome to Notion Clone!' }, { id: 'item-home-2', markdownText: '- This is a study project' }, { id: 'item-home-3', markdownText: '- Use Notion clone to organize your notations with lists, titles formats and more!'}, { id: 'item-home-4', markdownText: '- [Link example](https://www.youtube.com/embed/qbxCamPwMWs?si=3ePzPNK4irCiyOf-)'},]

  const generateId = (index: number): string => {
    return `item-${String(index)}`;
  }

  const newTextArea = () => {
    if (isHome) return;
    const thereIsntId = textAreas.filter((textAreaObject) => textAreaObject.id == generateId(textAreas.length)).length === 0;
    const id: string = thereIsntId ? generateId(textAreas.length) : generateId(textAreas.length + 1);
    const newTextAreas = [...textAreas, { id, markdownText: null }];
    setTextAreas(newTextAreas);
  };

  const removeEmpty = (idToRemove: string) => {
    if (isHome) return;
    const newTextAreas = textAreas.filter((textAreaObject) => textAreaObject.id !== idToRemove);
    setTextAreas(newTextAreas);
  };

  const saveContentTextArea = async (idToSave: string, markdownContent: string) => {
    if(isHome) return;

    textAreas.forEach((obj) => {
      if (obj.id === idToSave) {
        obj.markdownText = markdownContent;
      }
    });
  
    if(!pageDataToLoad || textAreas?.length > pageDataToLoad?.length) updatePageData();
  };

  const updatePageData = async () => {
    try {
      const dataToSave = textAreas ? { pageId, textAreas } : null;
      if (!dataToSave) return;

      const response = await fetch('/api/manage-pages-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });
      const data = await response.json();
    } catch (error) {
      console.error('request error:', error);
    }
  };

  const loadPage = async () => {
    if (pageDataToLoad && pageDataToLoad.length != 0) setTextAreas(pageDataToLoad)
  }

  useEffect(() => {
    loadPage();
  }, [pageDataToLoad])

  useEffect(() => {
    if (!textAreas || textAreas.length === 0) setTextAreas([{ id: 'item-0', markdownText: 'Type something here...'}])
  }, [textAreas])

  return (
    <div className='main-content'>
      {!isHome && textAreas && (
        textAreas.map((textAreaObject, index) => (
          <MarkdownEditor insertTextAreaValue={textAreaObject.markdownText} newTextArea={newTextArea} saveContentTextArea={saveContentTextArea} key={textAreas[index].id} id={textAreas[index].id} removeEmpty={removeEmpty} />
        ))
      )};

      {isHome && homeData && (
        homeData.map((textAreaObject, index) => (
          <MarkdownEditor insertTextAreaValue={textAreaObject.markdownText} key={homeData[index].id} id={homeData[index].id} removeEmpty={removeEmpty} isHome={true} />
        ))
      )};
    </div>
  );
};

export default MainContent;