import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
     <>
        <div className="">
            {gotoPrevPage ? (
                <button className='px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-700' 
                onClick={gotoPrevPage}>
                    ⏮️Prev
                </button>
            ) : (
                <button className='px-4 py-2 rounded-md bg-sky-300 text-white' 
                disabled>
                    ⏮️Prev
                </button>
            )}

            <button className='ml-2 px-4 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-700' 
            onClick={gotoNextPage}>
                Next⏭️
            </button>
        </div>
    </>
  )
}
