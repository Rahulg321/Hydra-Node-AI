"use server";

const UpdateProfilePic = async (formData: FormData) => {
  try {
    console.log("Values in profile pic server action");

    const image = formData.get("image") as File;
    const fileName = formData.get("fileName") as string;

    console.log("file is", image);

    const url = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}?${process.env.AZURE_STORAGE_SAS_TOKEN}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": image.type,
      },
      body: image,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`,
      );
    }

    console.log("upload response", response.body, response.blob);

    // https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}

    const imageUrl = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${process.env.AZURE_STORAGE_CONTAINER_NAME}/${fileName}`;

    return {
      success: true,
      message: "Successfully Uploaded Image",
      imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occured ${error}`,
    };
  }
};

export default UpdateProfilePic;
