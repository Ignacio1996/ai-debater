export type TopicType = {
  id: string;
  title: string;
  description: string;
};

export type Response = {
  id: number;
  content: string;
  side: "for" | "against";
};