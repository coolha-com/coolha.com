import { convertLinksToHTML } from '@/utils/convertLinksToHTML';
import Link from 'next/link';
import React from 'react';
import { RiAttachment2, RiMapPin2Line, RiSpotifyLine, RiTwitterXFill, RiYoutubeLine } from 'react-icons/ri';

export default function UseBio({ profile }) {
  const bioText = profile?.metadata?.bio || '';
  const formattedBio = convertLinksToHTML(bioText);

  let website: string | null = null;
  let x: string | null = null;
  let youtube: string | null = null;
  let spotify: string | null = null;
  let location: string | null = null;
  if (profile?.metadata?.attributes) {
    for (const attribute of profile.metadata.attributes) {
      if (attribute.key === 'website') {
        website = attribute.value;
      }
      if (attribute.key === 'x') {
        x = attribute.value;
      }
      if (attribute.key === 'youtube') {
        youtube = attribute.value;
      }
      if (attribute.key === 'spotify') {
        spotify = attribute.value;
      }
      if (attribute.key === 'location') {
        location = attribute.value;
      }
    }
  }
  return (
    <div className='bg-base-100'>


      <div className='py-2 px-4'><p className="text-base" dangerouslySetInnerHTML={{ __html: formattedBio }}></p></div>



      <div className='md:grid md:justify-items-start  md:grid-cols-3  md:gap-2 flex flex-col items-start  py-1 px-4 gap-0.5'>
        {location &&
          <div>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${location}`}
              className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
              <RiMapPin2Line size={14} />{location}
            </Link>
          </div>
        }
        {website &&
          <div>
            <Link
              href={`${website}`}
              className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
              <RiAttachment2 size={14} />{website}
            </Link>
          </div>
        }
        {x &&
          <div>
            <Link
              href={`https://x.com/${x}`}
              className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
              <RiTwitterXFill size={14} />{x}
            </Link>
          </div>
        }
        {youtube &&
          <div>
            <Link
              href={`https://www.youtube.com/${youtube}`}
              className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
              <RiYoutubeLine size={14} />{youtube}
            </Link>
          </div>
        }
        {spotify &&
          <div>
            <Link
              href={`https://www.spotify.com/${spotify}`}
              className=' hover:text-primary hover:underline text-base flex flex-row justify-center items-center' target='_blank'>
              <RiSpotifyLine size={14} />{spotify}
            </Link>
          </div>
        }



      </div>



    </div>
  );
}