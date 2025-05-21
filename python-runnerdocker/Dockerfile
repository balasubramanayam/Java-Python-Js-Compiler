FROM python:3-slim

# Install necessary tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    coreutils \
    procps \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /app

# Copy the runner script
COPY run.sh /app/run.sh

# Ensure proper line endings and permissions
RUN dos2unix /app/run.sh && \
    chmod +x /app/run.sh && \
    cat -A /app/run.sh | head -1

# Set security restrictions
RUN useradd -m pythonuser
USER pythonuser

# Define default command - using sh explicitly
CMD ["/bin/bash", "/app/run.sh"]