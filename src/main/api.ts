import z from 'zod';
import { initTRPC } from '@trpc/server';
import { EventEmitter } from 'events';
import { observable } from '@trpc/server/observable';

const ee = new EventEmitter();

const t = initTRPC.create({ isServer: true });

export const router = t.router({
  greeting: t.procedure.input(z.object({ data: z.string() })).query((req) => {
    const { input } = req;

    ee.emit('greeting', `Greeted ${input.data}`);
    return {
      text: `Hello ${input.data}` as const,
    };
  }),
  greetingSubscription: t.procedure.subscription(() => {
    return observable((emit) => {
      function onGreet(text: string) {
        emit.next({ text });
      }

      ee.on('greeting', onGreet);

      return () => {
        ee.off('greeting', onGreet);
      };
    });
  }),
});

export type AppRouter = typeof router;
