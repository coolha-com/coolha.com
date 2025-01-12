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


      <div className='py-1 px-4'><p className="text-base" dangerouslySetInnerHTML={{ __html: formattedBio }}></p></div>



      <div className='flex flex-wrap items-start  py-1 px-4 gap-1'>
        {location &&
          <div>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${location}`}
              className='  btn  btn-ghost   btn-sm' target='_blank'>
              <RiMapPin2Line size={20} />{location}
            </Link>
          </div>
        }
        {website &&
          <div>
            <Link
              href={`${website}`}
              className='  btn  btn-ghost  btn-sm' target='_blank'>
              <RiAttachment2 size={20} />{website}
            </Link>
          </div>
        }
        {x &&
          <div>
            <Link
              href={`https://x.com/${x}`}
              className='  btn  btn-ghost btn-circle btn-sm' target='_blank'>
              <RiTwitterXFill size={20} />
            </Link>
          </div>
        }
        {youtube &&
          <div>
            <Link
              href={`https://www.youtube.com/${youtube}`}
              className='  btn  btn-ghost btn-circle btn-sm' target='_blank'>
              <RiYoutubeLine size={20} />
            </Link>
          </div>
        }
        {spotify &&
          <div>
            <Link
              href={`https://www.spotify.com/${spotify}`}
              className='  btn  btn-ghost btn-circle btn-sm' target='_blank'>
              <RiSpotifyLine size={20} />
            </Link>
          </div>
        }



      </div>



    </div>
  );
}