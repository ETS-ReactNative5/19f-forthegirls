import React from "react";
import { View, SafeAreaView } from "react-native";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const chatClient = new StreamChat('f8wwud5et5jd');
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoibXVkZHktcml2ZXItMCJ9.Dl58nP-a5wFd-8Tou0a0_WlXknK1nyhpInCv3ynhX5c';

const user = {
  id: 'muddy-river-0',
  name: 'Muddy river',
  image:
    'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
};

chatClient.setUser(user, userToken);

class ChannelScreen extends React.Component {
  render() {
    const channel = chatClient.channel("messaging", "muddy-river-0");
    channel.watch();

    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <ChannelScreen />;
  }
}
