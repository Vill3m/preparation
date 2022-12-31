interface IEvent {
  id: number;
}

interface IEventInfo extends IEvent {
  name: string;
  /** Event execution timestamp. */
  time: number;
}

interface IEventsList {
  /** Total pages count. */
  pagesCount: number;
  /** Events ordered by time (most recent in the beginning) */
  events: IEvent[];
}

/** Returns Promise with page events (only shortened info) */
declare function getAllEvents(page: number): Promise<IEventsList>;

/** Returns Promise with favorite page events (only shortened info) */
declare function getFavoriteEvents(page: number): Promise<IEventsList>;

/** Returns Promise with full event info by id */
declare function getEventById(id: number): Promise<IEventInfo>;

/**
 * Create two event lists with full info from all pages:
 * 1. Favorite events list (favorites)
 *   - in order from getFavoriteEvents()
 * 2. Non-favorite events list (other)
 *   - in order from getAllEvents() excluding favorite events
 *
 * To get full event info use getEventById()
 *
 * Requirements:
 * 1. Load data in fastest way possible (using concurrency)
 * 2. Filter events in O(n), n - events count
 */
