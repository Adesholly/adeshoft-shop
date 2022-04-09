import axios from "axios"
import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_RESET,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({
    type: USER_LOGOUT,
  })
  dispatch({
    type: USER_LIST_RESET,
  })
  dispatch({
    type: USER_UPDATE_RESET,
  })

  window.location.replace("http://localhost:3000")
}

export const register = (name, email, password) => async (distpach) => {
  try {
    distpach({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    )

    distpach({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })

    distpach({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data))
  } catch (error) {
    distpach({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserDetail = (id) => async (distpach, getState) => {
  try {
    distpach({
      type: USER_DETAIL_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)
    distpach({
      type: USER_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    distpach({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUserDetail = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put("/api/users/profile", user, config)

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      Payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      Payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({ type: USER_EDIT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      Payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
