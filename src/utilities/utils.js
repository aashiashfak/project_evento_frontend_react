export const handleGoogleLoginSuccess = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;

    // Make a fetch call to your API with the token in the body
    const response = await fetch(
      "http://localhost:8000/accounts/google/oauth1/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({access_token: token}), // Use 'access_token' as the key
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    // Handle the response from your API (e.g., store user info, redirect, etc.)
    return data;
  } catch (error) {
    console.error("Error during Google authentication:", error);
    throw error; // Re-throw the error after logging it
  }
};
