import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import render from "../../../__mocks__/render";
import Navbar from "../../../components/Navbar";
import { cleanup, fireEvent } from "@testing-library/react";
import {
  markAllAsRead,
  notificationView
} from "../../../lib/services/notificationService";
import { waitForElement } from "@testing-library/dom";
import localStorage from "../../../__mocks__/LocalStorage";

jest.mock("../../../lib/services/notificationService");

const initialState = {
  notificationState: {
    data: {
      status: "success",
      message: "Notifications fetched successfully",
      data: [
        {
          id: 1,
          userId: 2,
          type: "new_request",
          messages: "New Travel Requested 1",
          isRead: false,
          requestId: 1,
          createdAt: "2020-01-23T11:36:42.470Z",
          updatedAt: "2020-01-29T11:55:17.937Z"
        },
        {
          id: 4,
          userId: 2,
          type: "new_request",
          messages: "New Travel Requested",
          isRead: false,
          requestId: 4,
          createdAt: "2020-01-23T11:36:51.720Z",
          updatedAt: "2020-01-29T11:55:17.937Z"
        },
        {
          id: 3,
          userId: 2,
          type: "new_comment",
          messages: "New Comment on Travel Requested",
          isRead: false,
          requestId: 3,
          createdAt: "2020-01-23T11:36:48.851Z",
          updatedAt: "2020-01-29T11:55:17.937Z"
        },
        {
          id: 5,
          userId: 2,
          type: "request_approved_or_rejected",
          messages: "Travel Requested approved",
          isRead: false,
          requestId: 5,
          createdAt: "2020-01-23T11:36:54.791Z",
          updatedAt: "2020-01-29T11:55:17.937Z"
        },
        {
          id: 2,
          userId: 2,
          type: "edited_request",
          messages: "Travel Request edited",
          isRead: false,
          requestId: 2,
          createdAt: "2020-01-23T11:36:46.765Z",
          updatedAt: "2020-01-29T11:55:17.937Z"
        }
      ]
    },
    error: null,
    status: "success"
  },
  navbarState: {
    navItems: [
      {
        linkText: "Home",
        linkRoute: "/home"
      },
      {
        linkText: "Request a trip",
        linkRoute: "/trip-request"
      },
      {
        linkText: "Destinations",
        linkRoute: "/destinations"
      },
      {
        linkText: "Approved trips",
        linkRoute: "/approved-trips"
      },
      {
        linkText: "Requests",
        linkRoute: "/requests"
      }
    ]
  },
  authState: {
    isAuthenticated: true
  }
};

notificationView.mockImplementation(() => Promise.resolve({
    data: {
      "status": "success",
      "message": "Notifications fetched successfully",
      "data": [
        {
          "id": 1,
          "userId": 2,
          "type": "new_request",
          "messages": "New Travel Requested",
          "isRead": false,
          "requestId": 1,
          "createdAt": "2020-01-23T11:36:42.470Z",
          "updatedAt": "2020-01-29T11:55:17.937Z"
        },
        {
          "id": 4,
          "userId": 2,
          "type": "new_request",
          "messages": "New Travel Requested",
          "isRead": false,
          "requestId": 4,
          "createdAt": "2020-01-23T11:36:51.720Z",
          "updatedAt": "2020-01-29T11:55:17.937Z"
        },
        {
          "id": 3,
          "userId": 2,
          "type": "new_comment",
          "messages": "New Comment on Travel Requested",
          "isRead": false,
          "requestId": 3,
          "createdAt": "2020-01-23T11:36:48.851Z",
          "updatedAt": "2020-01-29T11:55:17.937Z"
        },
        {
          "id": 5,
          "userId": 2,
          "type": "request_approved_or_rejected",
          "messages": "Travel Requested approved",
          "isRead": false,
          "requestId": 5,
          "createdAt": "2020-01-23T11:36:54.791Z",
          "updatedAt": "2020-01-29T11:55:17.937Z"
        },
        {
          "id": 2,
          "userId": 2,
          "type": "edited_request",
          "messages": "Travel Request edited",
          "isRead": false,
          "requestId": 2,
          "createdAt": "2020-01-23T11:36:46.765Z",
          "updatedAt": "2020-01-29T11:55:17.937Z"
        }]
    }
  }
));
markAllAsRead.mockImplementation(() => Promise.resolve({
  data: {
    "status": "success",
    "message": "All notifications marked as read"
  }
}));

beforeEach(() => {
  global.localStorage = localStorage;
  global.localStorage.setItem("bn_user_data", `{
			"email":"requestero@user.com",
			"name":"requester",
			"userId":2,
			"verified":true,
			"role":"requester",
			"lineManagerId":7,
			"iat":1578472431,
			"exp":1578558831
		}`);
});
afterEach(cleanup);


describe("NavLinkItem template component", () => {

  it("should display notification", () => {
    const { notificationState, ...rest } = initialState;
    const { getByTestId } = render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>,
      { ...rest, notificationState: { data: null } }
    );
    expect(getByTestId("no-unread-notifications")).toBeInTheDocument();
  });

  it("should display notification", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>,
      initialState
    );

    const notificationHeader = await waitForElement(() => getByText("Mark all as read"));
    fireEvent.click(notificationHeader);
   expect(getByText("No unread notifications")).toBeInTheDocument();
  });

  it("should display notification", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>,
      initialState
    );

    const notificationItem = getByText("New Travel Requested 1");
    fireEvent.click(notificationItem);
   expect(getByText("Mark all as read")).toBeInTheDocument();
  });
});
