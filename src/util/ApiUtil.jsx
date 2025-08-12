import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const frameToken = (token) => `Bearer ${token}`;

const frameResponse = (
  reqStatus = 0,
  reqPayLoad = "Invalid request. Please try again later."
) => {
  return {
    status: reqStatus,
    payLoad: reqPayLoad,
  };
};

export const registerApi = async (
  username,
  password,
  emailId,
  firstName,
  lastName,
  phone
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/signup`;
    const apiResponse = await axios.post(url, {
      username,
      password,
      emailId,
      firstName,
      lastName,
      phone,
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const verifyEmailApi = async (token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/verify/email`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const loginApi = async (username, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/login`;
    const apiResponse = await axios.post(url, { username, password });
    if (apiResponse.status === 200) {
      const payLoad = {
        userData: apiResponse.data,
        token: apiResponse.headers.authorization,
      };
      response = frameResponse(1, payLoad);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const forgotPasswordApi = async (email) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset/${email}`;
    const apiResponse = await axios.get(url);
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const resetPasswordApi = async (token, password) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/reset`;
    const apiResponse = await axios.post(
      url,
      {
        password,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const sessionApi = async (token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/get`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const updatePublicProfileApi = async (
  token,
  bio,
  city,
  country,
  headline,
  picture
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/update/profile`;
    const apiResponse = await axios.post(
      url,
      {
        bio,
        city,
        country,
        headline,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const addFeedApi = async (token, content, picture) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds`;
    const apiResponse = await axios.post(
      url,
      {
        content,
        picture,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const addFeedMetaDataApi = async (token, feedId, isLike, comment) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds/meta/${feedId}`;
    const apiResponse = await axios.post(
      url,
      {
        isLike,
        comment,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const getOthersFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds/other/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const getMyFeedsApi = async (token, pageNumber) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds/user/${pageNumber}/5`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const updateBasicProfileApi = async (
  token,
  password,
  emailId,
  firstName,
  lastName,
  phone
) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/update`;
    const apiResponse = await axios.post(
      url,
      {
        password,
        emailId,
        firstName,
        lastName,
        phone,
      },
      { headers: { Authorization: frameToken(token) } }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const deleteFeedsApi = async (token, feedId) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds/${feedId}`;
    const apiResponse = await axios.delete(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const generatePortraitApi = async (token, style, gender, additional) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/user/generate-and-set-avatar`;
    const apiResponse = await axios.post(
      url,
      {
        style: style,
        gender: gender,
        additionalPrompt: additional,
      }, //Extra parameters needed. Should double check these.
      {
        headers: { Authorization: frameToken(token) },
      }
    );
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};

export const suggestCommentsApi = async (feedId, token) => {
  let response = frameResponse();
  try {
    const url = `${API_BASE_URL}/feeds/${feedId}/comment-suggestions`;
    const apiResponse = await axios.get(url, {
      headers: { Authorization: frameToken(token) },
    });
    if (apiResponse.status === 200) {
      response = frameResponse(1, apiResponse.data);
    }
  } catch (err) {
    if (err.response) {
      response = frameResponse(0, err.response.data.message);
    }
    console.log(err);
  } finally {
    return response;
  }
};
