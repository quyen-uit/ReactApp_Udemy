import { useState } from "react";
import { Grid, Image, Header, Button } from "semantic-ui-react";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";

interface Props {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}
export default function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
  const [files, setFiles] = useState<any>([]);
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" content="add photo" />
        <PhotoWidgetDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        {files &&
          files.map((item: any, index: any) => (
            <>
              <Image key={index} src={item.preview} />
              <Button
                content="upload"
                loading={loading}
                onClick={() => uploadPhoto(item.file)}
              />
            </>
          ))}
      </Grid.Column>
    </Grid>
  );
}
