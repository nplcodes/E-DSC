import { UpdateDescusion } from "@/lib/actions";
import { getSingleDuscusion } from "@/lib/data";

const page = async ({params}) => {
  const {id} = params;
  const {descusion, user} = await getSingleDuscusion(id)
  return (
    <div className='px-64 py-32'>
      <form className='min-w-3xl bg-white rounded-lg p-6 shadow-md mb-8 px-32' action={UpdateDescusion}>
        <h2 className='text-2xl font-semibold mb-4'>Edit Discusion </h2>
        <div>
          <label htmlFor="title" className='block text-sm font-medium text-gray-700'>Title</label>
          <input type="text" id='title' hidden  name='id' value={id} className='mt-1 p-3 border w-full rounded-md focus:outline-none focus:border-blue-700'/>
          <input type="text" id='title' placeholder={descusion?.title}   name='title' className='mt-1 p-3 border w-full rounded-md focus:outline-none focus:border-blue-700'/>
        </div>
        <div>
          <label htmlFor="descrption" className='block text-sm font-medium text-gray-700'>Description</label>
          <textarea id='title' rows={6}  placeholder={descusion?.description}  name='title' className='mt-1 p-3 border w-full rounded-md focus:outline-none focus:border-blue-700'/>
        </div>
        <button type='submit' className='bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue'>Edit</button>
      </form>
    </div>
  )
}

export default page