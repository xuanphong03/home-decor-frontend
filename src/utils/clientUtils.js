export const uploadImageCloudinary = async (file) => {
  const data = new FormData();
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  data.append("cloud_name", cloudName);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const dataCloudinary = await response.json();
  return dataCloudinary.url;
};

export const getFirstCharacterOfName = (fullname) => {
  if (!fullname || typeof fullname !== "string") {
    return "";
  }
  const nameParts = fullname.trim().split(" ");
  const lastName = nameParts[nameParts.length - 1];
  return lastName.charAt(0);
};

export const generateOrderCode = (orderNumber) => {
  if (orderNumber > 99999) return orderNumber.toString();
  return orderNumber.toString().padStart(10, "0");
};
