import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
     <>
        <div className="">
            {gotoPrevPage ? (
                <button className='px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-700' 
                onClick={gotoPrevPage}>
                    <span className='font-semibold md:text-lg'>⏮️Prev</span>
                </button>
            ) : (
                <button className='px-4 py-2 rounded-md bg-sky-300 text-white' 
                disabled>
                    <span className='font-semibold md:text-lg'>⏮️Prev</span>
                </button>
            )}

            <button className='ml-2 px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-700' 
            onClick={gotoNextPage}>
                <span className='font-semibold md:text-lg'>Next⏭️</span>
            </button>
        </div>
    </>
  )
}
