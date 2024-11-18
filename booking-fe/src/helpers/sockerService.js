import { io } from "socket.io-client";
class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(partnerId) {
    if (!this.socket) {
      this.socket = io("https://booking-ten-omega.vercel.app0", {
        query: { partnerId }, // Gửi partnerId khi kết nối
      });
      console.log("Socket connected!");
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected!");
      this.socket = null;
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
