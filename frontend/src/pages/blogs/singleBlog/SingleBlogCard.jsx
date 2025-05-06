import { formatDate } from "../../../utils/formateDate";
import EditorJSHTML from "editorjs-html"

const editorJSHTML = EditorJSHTML()

const SingleBlogCard = ({ blog }) => {
    const { title, description, content, coverImg, category, rating, author, createdAt } = blog || {}

    const htmlContent = editorJSHTML.parse(content)


    return (
        <>
            <div className='bg-white p-8'>
                {/* blog header */}
                <div>
                    <h1 className='md:text-3xl text-2xl font-medium mb-4'>{title}</h1>
                    {/* Todo: Need to change author */}
                    <p>
                        {formatDate(createdAt)} by
                        <span className="cursor-pointer text-blue-400">Admin 1</span></p>
                </div>
                <div>
                    <img src={coverImg} alt="cover image" className="w-full md:h-[520px] bg-cover" />
                </div>

                {/* blog details */}
                <div className="mt-8 space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
                    <div>
                        <span className="text-lg font-medium">Rating: </span>
                        <span>{rating} (based on 2,370 reviews)</span>
                    </div>

                </div>

            </div>
        </>
    )
}

export default SingleBlogCard