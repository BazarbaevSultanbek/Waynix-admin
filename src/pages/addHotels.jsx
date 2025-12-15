import { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Group,
  Stack,
  Image,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export default function AddHotel() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      location: "",
      rating: 0,
      price: 0,
      image: null,
    },

    validate: {
      name: (v) => (v.length < 2 ? "Hotel name is too short" : null),
      location: (v) => (!v ? "Location is required" : null),
      price: (v) => (v <= 0 ? "Price must be greater than 0" : null),
      image: (v) => (!v ? "Hotel image is required" : null),
    },
  });

const handleSubmit = async (values) => {
  try {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("rating", values.rating);
    formData.append("price", values.price);
    formData.append("image", values.image); // MUST be File

    console.log("Sending:", Object.fromEntries(formData));

    await axios.post(
      "http://localhost:8001/api/hotels",
      formData,
      {
        withCredentials: true, // OK
        // ❌ NO headers here
      }
    );

    alert("Hotel added!");
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
};


  return (
    <Container size="sm" py="xl">
      <Paper radius="lg" p="xl" shadow="md" pos="relative">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Title order={2} mb="md">
          Add New Hotel
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Hotel Name"
              placeholder="Grand Palace"
              {...form.getInputProps("name")}
            />

            <Textarea
              label="Description"
              placeholder="Luxury hotel near the beach"
              minRows={3}
              {...form.getInputProps("description")}
            />

            <TextInput
              label="Location"
              placeholder="Dubai, UAE"
              {...form.getInputProps("location")}
            />

            <Group grow>
              <NumberInput
                label="Rating"
                min={0}
                max={5}
                step={0.1}
                {...form.getInputProps("rating")}
              />

              <NumberInput
                label="Price per night"
                min={0}
                {...form.getInputProps("price")}
              />
            </Group>

            <Dropzone
              accept={IMAGE_MIME_TYPE}
              maxSize={5 * 1024 ** 2}
              onDrop={(files) => {
                form.setFieldValue("image", files[0]);
              }}
            >
              <Group justify="center" mih={120}>
                Drag & drop hotel image
              </Group>
            </Dropzone>

            {preview && <Image src={preview} radius="md" />}

            <Button type="submit" size="md" mt="md">
              Save Hotel
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
