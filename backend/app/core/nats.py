import logging
import nats
from nats.js import JetStreamContext
from app.core.config import settings

logger = logging.getLogger(__name__)

class NATSManager:
    def __init__(self):
        self.nc = None
        self.js = None

    async def connect(self):
        try:
            # Set a small timeout so connection issues don't hang server startup
            self.nc = await nats.connect(settings.NATS_URL, connect_timeout=2)
            self.js = self.nc.jetstream()
            logger.info("Connected to NATS.io successfully")
        except Exception as e:
            self.nc = None
            self.js = None
            logger.warning(
                f"Could not connect to NATS.io at {settings.NATS_URL}: {e}. "
                "Running in standalone mode without NATS event bus features."
            )

    async def disconnect(self):
        if self.nc:
            try:
                await self.nc.close()
                logger.info("Disconnected from NATS.io")
            except Exception as e:
                logger.error(f"Error during NATS disconnect: {e}")

    async def publish(self, subject: str, payload: bytes):
        if not self.nc:
            # Attempt reconnection if not currently connected
            await self.connect()
        if self.nc:
            await self.nc.publish(subject, payload)
        else:
            logger.error(f"Failed to publish to subject '{subject}': NATS connection is unavailable.")
            raise ConnectionError("NATS server is offline or unavailable.")

nats_manager = NATSManager()
