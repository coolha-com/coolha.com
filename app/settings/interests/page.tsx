'use client'
import {
  useAddProfileInterests,
  useRemoveProfileInterests,
  Profile,
  ProfileInterestTypes,
  useSession,
  SessionType,
  useProfile,
} from '@lens-protocol/react-web';

import { Fragment, useMemo } from 'react';
//https://www.lens.xyz/docs/primitives/profile/interests
export default function page() {
  const { data } = useSession({ suspense: true });
  const { execute: addInterests } = useAddProfileInterests();
  const { execute: removeInterests } = useRemoveProfileInterests();
  const groupedInterests = useMemo(() => {
    const interests = createInterests(Object.values(ProfileInterestTypes));

    // Group interests by category
    return interests.reduce((acc, interest) => {
      acc[interest.parent] = acc[interest.parent] || [];
      acc[interest.parent].push(interest);
      return acc;
    }, {} as Record<string, Interest[]>);
  }, []);

  if (data.type === SessionType.Anonymous) {
    return (
      <div className="">
        <div>暂未登录账户</div>
      </div>
    );
  }

  if (data.type === SessionType.WithProfile) {
    const ProfileWithProfile = data.profile.handle?.fullHandle ?? data.profile.id;
    const { data: profile } = useProfile({
      forHandle: ProfileWithProfile
    });

    if (!profile) {
      return <div>正在加载档案信息...</div>;
    }


    const handleClick = async (interest: ProfileInterestTypes) => {
      const request = {
        interests: [interest],
      };

      if (profile.interests.includes(interest)) {
        await removeInterests(request);
      } else {
        await addInterests(request);
      }
    };

    return (
      <div>
        {/* <button onClick={() => handleClick(ProfileInterestTypes.Business)}>Business</button> */}
        <b>选择个人兴趣</b>
        <p>您选择的兴趣用于个性化您的体验</p>
        <div>
          {Object.entries(groupedInterests).map(([category, items]) => (
            <div key={category}>
              <h4 className='mt-2'>{capitalize(category.replace(/_/g, ' '))}</h4>
              <div>
                {items.map((item) => (
                  <Fragment key={item.value}>
                    <ToggleButton
                      onClick={() => handleClick(item.value)}
                      isActive={profile.interests.includes(item.value)}
                    >
                      {item.label}
                    </ToggleButton>{' '}
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

}



// Capitalizes each word in a string
function capitalize(label: string): string {
  return label.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}

type Interest = {
  parent: string;
  value: ProfileInterestTypes;
  label: string;
};

// Processes raw interest types into structured interests array
function createInterests(categories: ProfileInterestTypes[]): Interest[] {
  return categories.map((item) => {
    const [parent, subcategory] = item.split('__');
    const label = capitalize(
      subcategory ? subcategory.replace(/_/g, ' ') : parent.replace(/_/g, ' '),
    );
    return { parent, value: item, label };
  });
}

type ButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ToggleButton({ isActive, onClick, children }: ButtonProps) {
  const normalStyle = {
    backgroundColor: 'transparent',
    border: '1px solid grey',
    color: '#111',
    outline: 'none',
  };

  const activeStyle = {
    ...normalStyle,
    backgroundColor: '#333',
    color: '#eee',
  };

  return (
    <button className={`${isActive ? 'btn-primary btn btn-outline btn-sm btn-active mb-1' : 'btn btn-outline btn-sm mb-1'}`} onClick={onClick}>
      {children}
    </button>
  );
}


