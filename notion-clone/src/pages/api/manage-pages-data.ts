import { NextApiRequest, NextApiResponse } from 'next';

interface TextAreaTypes {
  id: string;
  markdownText: string | null;
}

interface ServerTextArea {
  pageId: string;
  name: string
  textAreas: TextAreaTypes[];
}

let pages: ServerTextArea[] = [
  {
    "pageId": 'page-353',
    "name": "Page 353",
    "textAreas": [
      {
        "id": "item-0",
        "markdownText": "# title"
      },
      {
        "id": "item-1",
        "markdownText": "## title 2"
      },
    ]
  }
]

export default async function managePagesData(req: NextApiRequest, res: NextApiResponse) {
  // add new page
  if (req.method === 'POST') {
    try {
      const pageId = req?.body?.pageId;
      const name = req?.body?.name;
      const textAreas = req?.body?.textAreas;

      if (!pageId || !textAreas || !Array.isArray(textAreas)) return res.status(400).json({ error: "Invalid request body format." });
      else if (pages.some(item => item.pageId === pageId)) return res.status(409).json({ error: "Page with the same pageId already exists." });

      pages.splice(0, 0, req.body);
      res.status(200).json(pages);
    } 

    catch (error) {
      res.status(500).json({ error: error });
    }
  }

  // update a page
  else if (req.method === "PUT") {
    try {
      const pageId = req?.body?.pageId;
      const name = req?.body?.name;
      const textAreas = req?.body?.textAreas;

      if (!pageId || !textAreas || !Array.isArray(textAreas)) return res.status(400).json({ error: "Invalid request body format." });

      const updatePageIndex = pages.findIndex(obj => obj.pageId === pageId);
      if (updatePageIndex !== -1) {
        pages[updatePageIndex] = req.body;
        return res.status(200).json(pages);
      }

      res.status(404).json({ error: "Page id not found." })
    } 

    catch (error) {
      res.status(500).json({ error: error });
    }
  }

  // return all pages
  else if (req.method === 'GET') {
    try {
      const pageId = req?.query?.pageId;

      // GET per all pages
      if(!pageId && pages.length > 0) {
        return res.status(200).json(pages);
      }

      //GET per one page
      else if(pageId && pages.length > 0) {
        const responseData = pages.find(item => item.pageId === pageId);
        responseData ? res.status(200).json(responseData) : res.status(404).json({ error: "Page not found" });
      }
      else {
        res.status(404).json({ error: "Page(s) not found" }) 
      }
    }
    catch (err) {
      res.status(500).json({ error: err });
    }
  } else res.status(405).json({ error: "not allowed method." });
};
