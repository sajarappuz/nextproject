import getWiki from "@/lib/getWiki"
import Item from "./item"
type Props = {
    params:{
        searchTerm: string
    }
}
export async function generateMetadata({params :{searchTerm}}: Props){
  const wikiData : Promise<SearchResult> = getWiki(searchTerm)
    const data = await wikiData 
    const displayTerm = searchTerm.replaceAll('%20', ' ') 

    if(!data?.query?.pages){
        return {
            title:`${displayTerm} not found`
        }
    }
    return{
        title: displayTerm,
        description:`search result for ${displayTerm}`
    }
}

export default async function searchResultPage({params :{searchTerm}}: Props) {
    const wikiData : Promise<SearchResult> = getWiki(searchTerm)
    const data = await wikiData
    const results :Result[] | undefined =data?.query?.pages
    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results ? Object.values(results).map(result => {
            return <Item key={result.pageid} result={result}/>})
            : <h2>{`${searchTerm} not found`}</h2>}

        </main>
    )
  return content
  
}