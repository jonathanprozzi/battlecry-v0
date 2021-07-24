import { NextApiHandler } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const createIssue: NextApiHandler = async (req, res) => {
  const contactName = req.body.contactName;
  const contactEmail = req.body.contactEmail;
  const contactMessage = req.body.contactMessage;

  try {
    const createdIssue = await {
      //   Name: contactName,
      //   Email: contactEmail,
      //   Message: contactMessage,
    };

    res.status(200).json({
      msg: "went through!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: "Something went wrong with your submission.",
    });
  }
};

export default createIssue;
