import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Card, Tab, Image, Header, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };
  const handleDeletePhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  };
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon={"image"} content="Photos" />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={addPhotoMode ? "Cancel" : "Add photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              loading={uploading}
              uploadPhoto={handlePhotoUpload}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos &&
                profile.photos.map((img) => (
                  <Card key={img.id}>
                    <Image src={img.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          basic
                          color="green"
                          content="Main"
                          name={"main" + img.id}
                          disabled={img.isMain}
                          loading={target === "main" + img.id && uploading}
                          onClick={(e) => handleSetMainPhoto(img, e)}
                        />
                        <Button
                          basic
                          color="red"
                          icon="trash"
                          disabled={img.isMain}
                          name={img.id}
                          loading={target === img.id && uploading}
                          onClick={(e) => handleDeletePhoto(img, e)}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfilePhotos);
