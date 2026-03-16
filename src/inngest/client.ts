import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

export const inngest = new Inngest({ 
  id: "nodebase",
  eventKey:process.env.INNGEST_EVENT_KEY,
  middleware: [realtimeMiddleware()],
});