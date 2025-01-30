import { getDictionary } from "../dictionaries";

export default async function Home({ params: { lang } }: any) {
  const trans = await getDictionary(lang);

  return (
    <div className="text-center p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white-700 mb-4">{lang.toUpperCase()}</h2>
      <h1 className="text-xl text-white-600">{trans.title}</h1>
    </div>
  );
}
