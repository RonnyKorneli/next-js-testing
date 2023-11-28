import Image from "next/image";
import FirstStories from "../../../components/firstStories.jsx";
import HtmlRenderer from './htmlRender.jsx'

async function getStory(id) {
    const res = await fetch(`http://localhost:2000/api/stories/get-story/${id}`, {
        next: {
            revalidate: 60
        }
    });
  return res.json();
}

async function Story({params}){
    const id = params.id;
    const story = await getStory(id);

    return(
        <>  
            <div className="w-full flex flex-col justify-center items-center prose">
                <h1 className="text-4xl md:text-6xl text-center w-[90%] md:w-[600px] font-[700] mt-32 mb-10">{story.title}</h1>
                <div className="w-full h-[400px] md:h-[700px] md:w-5/6 relative mb-6">
                    <Image
                        src={story.imageUrl}
                        className='md:rounded-3xl m-0 object-cover object-center'
                        fill
                        placeholder='blur'
                        blurDataURL={story.imageUrl}
                        alt="Picture of the author"
                        _id={id}

                    />
                </div>
                
                <HtmlRenderer htmlContent={story.body} />
                <FirstStories />
            </div>
        </>
    )
}

export default Story;