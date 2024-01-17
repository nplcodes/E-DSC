import { ReplyOnDescusion, deleteDiscusion } from '@/lib/actions';
import { getSingleDuscusion, getSingleUser, getUsers } from '@/lib/data'
import { TiDelete } from "react-icons/ti";
import { LuFolderEdit } from "react-icons/lu";
import Image from 'next/image'
import Link from 'next/link'


const page = async({params}) => {
    const {id} = params;
    const {descusion, user} = await getSingleDuscusion(id)

    const userrrDenide = await getUsers();
    const defineduser = userrrDenide[0]._id;
    
    
  return (
    <div className='grid grid-cols-6 gap-3 px-32'>
        <div className='col-span-2 py-6'>
            <p className='text-2xl font-extrabold pb-6'>Author Info</p>
            <div className='relative'>
                <Image src="/noimage.png" width={200} height={200} className='rounded-full' alt="Profile" />
            </div>
            <div className='mt-6'>
                <p className='text-xl font-bold'>Names: {user?.username}</p>
                <p className='text-sm text-gray-500'>Role: {user?.isModerator ? (' Moderator'):('User')}</p>
            </div>
            <div className='mt-6'>
                <p className='text-xl font-bold'>More info</p>
                <div className='text-sm text-gray-500'>
                    <p>Email: {user?.email}</p>
                    <p>Username: {user?.username}</p>
                </div>
            </div>
        </div>
        <div className='col-span-4'>
            <p>Topic & replies</p>
            <div>
                <div className='mt-3'>
                <div className='shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md px-6 py-3'>
                    <p className='pb-3'>{descusion?.description}</p>
                    <div className='flex gap-3'>
                        <Link href={`/panel/discusion/edit/${descusion?._id}`}>
                            <LuFolderEdit className='text-blue-500 text-xl' />
                        </Link>
                            {user?.isModerator ? (<div>
                                <form action={deleteDiscusion}>
                                    <input type="text" hidden name='id' value={descusion?._id} />
                                  <button type='submit'><TiDelete className='text-red-500 text-xl'/></button>
                                </form>
                            </div>)
                            :
                                ('')}
                        
                    </div>
                </div>
                </div>
                <div className='mt-6 px-2'>
                  <p>Replies</p>
                  <div className='replies'>
                    <div className=''>
                       {descusion?.replies?.map( async(reply) => {
                         const replyUser= await  getSingleUser(reply.whoreply);

                         return (
                            <div className='flex gap-2 items-center pt-2' key={reply?._id}>
                                <Image src='/noimage.png' width={50} height={50} className='rounded-full'/>
                                <div>
                                    <p className='font-bold text-sm'>{replyUser?.user?.username}</p>
                                    <p className='text-gray-500 text-sm'>{reply?.replayText}</p>
                                </div>
                            </div>
                         )
                       })}
                       
                    </div>
                    <form action={ReplyOnDescusion} className='mt-6' >
                        <div className=''>
                            <input type="text" hidden name='whoreply' value={defineduser?._id} />
                            <input type="text" hidden name='id' value={descusion?._id} />
                            <textarea id='title' rows={1} cols={20}  name='replayText' className='w-64 mt-1 p-3 border rounded-md focus:outline-none focus:border-blue-700'/>
                        </div>
                        <button className='px-3 py-1 bg-blue-500 text-white hover:bg-blue-800 rounded-md'>Reply</button>
                    </form>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page