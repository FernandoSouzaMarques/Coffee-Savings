"use client";

import { client } from "@/config/client";
import { TagsEnum } from "@/enum/Tags";
import { profileModalAtom } from "@/store/atoms/profileModalAtom";
import { Icon } from "@/app/components/Icon";
import { FormEvent, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import { random } from "@/utils/random";

interface IFormField {
  value: string;
}

interface IFormFields {
  name: IFormField;
  nickname: IFormField;
  password: IFormField;
}

const MAX_PROFILES = Number(process.env.NEXT_PUBLIC_MAX_PROFILES ?? 0);

export const NewProfileForm = () => {
  const setOpenProfileModal = useSetRecoilState(profileModalAtom);
  const [avatar, setAvatar] = useState(`profile-${random(1, MAX_PROFILES)}`);
  const [showAvatarList, setShowAvatarList] = useState(false);

  const currentAvatar = useMemo(() => {
    return `/images/profiles/${avatar}.jpg`;
  }, [avatar]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;

    const name = (fields as unknown as IFormFields)["name"].value;
    const nickname = (fields as unknown as IFormFields)["nickname"].value;
    const password = (fields as unknown as IFormFields)["password"].value;

    await client(`/users?tag=${TagsEnum.USER}`, {
      method: "POST",
      body: JSON.stringify({ name, nickname, password, avatar }),
      next: {
        tags: [TagsEnum.USER],
      },
    });

    setOpenProfileModal(false);
  }

  function handleShowAvatarList() {
    setShowAvatarList(true);
  }

  function handleSelectAvatar(avatarName: string) {
    setAvatar(avatarName);
    setShowAvatarList(false);
  }

  return (
    <>
      <div className="max-w-80 w-full max-h-96 overflow-auto custom-scrollbar transition-all">
        {showAvatarList && (
          <div>
            <ul className="w-full grid grid-cols-3 gap-4">
              {Array.from({ length: MAX_PROFILES }, (_, i) => i + 1).map(
                (index) => (
                  <li key={`profile-${index}`}>
                    <button
                      type="button"
                      className="rounded-lg overflow-hidden bg-white/20 w-full aspect-square"
                      onClick={() => handleSelectAvatar(`profile-${index}`)}
                    >
                      <img
                        className="aspect-square w-full"
                        src={`/images/profiles/profile-${index}.jpg`}
                        alt=""
                      />
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        {!showAvatarList && (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 px-0.5"
          >
            <button
              type="button"
              className="flex flex-col items-center justify-center"
              onClick={handleShowAvatarList}
            >
              <Icon icon={currentAvatar} size="md" />
              <span className="text-sm text-gray-600 mt-1">Profile image</span>
            </button>
            <input
              autoComplete="current-name"
              required
              id="name"
              name="name"
              type="text"
              placeholder="Name *"
            />
            <input
              required
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Nickname *"
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
            <button className="button" type="submit">
              Save
            </button>
          </form>
        )}
      </div>
    </>
  );
};
