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
            self.nc = await nats.connect(settings.NATS_URL)
            self.js = self.nc.jetstream()
            logger.info("Connected to NATS.io")
        except Exception as e:
            logger.error(f"Failed to connect to NATS.io: {e}")
            raise e

    async def disconnect(self):
        if self.nc:
            await self.nc.close()
            logger.info("Disconnected from NATS.io")

    async def publish(self, subject: str, payload: bytes):
        if not self.nc:
            await self.connect()
        await self.nc.publish(subject, payload)

nats_manager = NATSManager()
