FROM node:slim

# Install necessary tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    coreutils \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy the runner script
COPY run.sh /app/run.sh

# Set permissions
RUN chmod +x /app/run.sh

# Set security restrictions
RUN useradd -m nodeuser
USER nodeuser

# Define default command
CMD ["/bin/bash", "/app/run.sh"]