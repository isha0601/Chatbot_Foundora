# import os
# import json

# USE_REDIS = False  # change to True if you actually have Redis running

# if USE_REDIS:
#     import redis
#     r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)

# HISTORY_FILE = "history.json"

# def save_history(session_id, messages):
#     if USE_REDIS:
#         r.set(session_id, json.dumps(messages))
#     else:
#         with open(HISTORY_FILE, "w") as f:
#             json.dump({session_id: messages}, f)

# def load_history(session_id):
#     if USE_REDIS:
#         data = r.get(session_id)
#         return json.loads(data) if data else []
#     else:
#         if os.path.exists(HISTORY_FILE):
#             with open(HISTORY_FILE, "r") as f:
#                 data = json.load(f)
#                 return data.get(session_id, [])
#         return []



import redis
import json
import os

USE_REDIS = True  # ✅ set to True to use Redis

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

if USE_REDIS:
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def save_history(session_id, messages):
    """Save conversation history for a session."""
    if USE_REDIS:
        r.set(session_id, json.dumps(messages))
    else:
        with open(f"{session_id}_history.json", "w") as f:
            json.dump(messages, f)

def load_history(session_id):
    """Load conversation history for a session."""
    if USE_REDIS:
        data = r.get(session_id)
        return json.loads(data) if data else []
    else:
        if os.path.exists(f"{session_id}_history.json"):
            with open(f"{session_id}_history.json", "r") as f:
                return json.load(f)
        return []
